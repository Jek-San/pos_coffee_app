// projects/pos_coffee_shop/features/stalls/stalls.service.js
const { pos: prisma } = require("../../../../models/client");
const bcrypt = require("bcrypt");
const { imageService } = require("../../services/imageService");
const { email } = require("zod");
const sanitize = require('../../../../utils/sanitize');


const ensureSubCategory = async ({ name, category, merchantId }) => {
  // Try to find existing subcategory
  let sub = await prisma.subCategory.findFirst({
    where: {
      name: name.toUpperCase(),
      category,
      merchantId,
    },
  });

  if (!sub) {
    sub = await prisma.subCategory.create({
      data: {
        name: name.toUpperCase(),
        category,
        merchantId,
      },
    });
  }

  return sub;
};
// part of createMenuItemService
async function validateVariantGroups(variantGroups) {
  if (!Array.isArray(variantGroups)) {
    throw new Error('variantGroups must be an array');
  }

  for (const [index, group] of variantGroups.entries()) {
    if (!group.name || typeof group.name !== 'string') {
      throw new Error(`Variant group ${index}: name is required and must be a string`);
    }

    if (!Array.isArray(group.options)) {
      throw new Error(`Variant group "${group.name}": options must be an array`);
    }

    if (group.options.length === 0) {
      throw new Error(`Variant group "${group.name}": must have at least one option`);
    }

    for (const [optIndex, option] of group.options.entries()) {
      if (!option.name || typeof option.name !== 'string') {
        throw new Error(`Variant group "${group.name}", option ${optIndex}: name is required and must be a string`);
      }

      if (option.extraPrice !== undefined && typeof option.extraPrice !== 'number') {
        throw new Error(`Variant group "${group.name}", option "${option.name}": extraPrice must be a number`);
      }
    }
  }
}

async function handleVariantGroupsWithValidation(tx, variantGroups, menuItemId, merchantId) {
  if (!variantGroups?.length) return;

  // Validate input data first
  await validateVariantGroups(variantGroups);

  for (const group of variantGroups) {
    const { name, options } = group;

    try {
      // Find or create MenuVariantType with upsert to handle race conditions
      const variantType = await tx.menuVariantType.upsert({
        where: {
          name_merchantId: { // Assuming you have a compound unique constraint
            name,
            merchantId
          }
        },
        create: {
          name,
          merchantId
        },
        update: {}, // No updates needed if it exists
      });

      // Create variants with validation
      const variantData = options.map((option) => ({
        name: option.name.trim(),
        extraPrice: Number(option.extraPrice) || 0,
        menuItemId,
        variantTypeId: variantType.id
      }));

      await tx.menuVariant.createMany({
        data: variantData,
        skipDuplicates: true // Skip if duplicate names exist
      });

    } catch (error) {
      throw new Error(`Failed to create variant group "${name}": ${error.message}`);
    }
  }
}

async function handleVariantGroupsUpdate(menuItemId, merchantId, variantGroups) {
  if (!variantGroups?.length) {
    // If no variant groups provided, soft delete all existing variants for this menu item
    await prisma.menuVariant.updateMany({
      where: {
        menuItemId,
        deletedAt: null
      },
      data: { deletedAt: new Date() }
    });
    return;
  }

  console.log('variantGroups', variantGroups);
  console.log('menuItemId', menuItemId);

  // Get existing variant types for this specific menu item
  const existingVariantTypes = await prisma.menuVariantType.findMany({
    where: { merchantId },
    include: {
      options: {
        where: {
          menuItemId,
          deletedAt: null // Only get active variants
        }
      }
    }
  });

  // Track which variant types are being used in the update
  const incomingVariantTypeNames = variantGroups.map(group => group.name);

  for (const incomingGroup of variantGroups) {
    // 1️⃣ Find or create variantType
    let variantType = existingVariantTypes.find(
      t => t.name === incomingGroup.name
    );

    if (!variantType) {
      // Double-check if it exists in DB (might not be in our filtered list)
      variantType = await prisma.menuVariantType.findFirst({
        where: { name: incomingGroup.name, merchantId },
        include: {
          options: {
            where: {
              menuItemId,
              deletedAt: null
            }
          }
        }
      });

      if (!variantType) {
        variantType = await prisma.menuVariantType.create({
          data: { name: incomingGroup.name, merchantId },
          include: { options: [] }
        });
      }
    }

    // 2️⃣ Update or create variants
    for (const incomingOption of incomingGroup.options) {
      // First, check if ANY variant with this name exists for this menuItem (active or soft-deleted)
      const existingVariant = await prisma.menuVariant.findFirst({
        where: {
          name: incomingOption.name,
          menuItemId
        }
      });

      if (existingVariant) {
        // Update the existing variant (whether active or soft-deleted)
        await prisma.menuVariant.update({
          where: { id: existingVariant.id },
          data: {
            extraPrice: incomingOption.extraPrice,
            variantTypeId: variantType.id,
            deletedAt: null // Ensure it's active
          }
        });
      } else {
        // Create brand new variant
        await prisma.menuVariant.create({
          data: {
            name: incomingOption.name,
            extraPrice: incomingOption.extraPrice,
            menuItemId,
            variantTypeId: variantType.id
          }
        });
      }
    }

    // 3️⃣ Soft delete variants that are no longer in the incoming group
    const incomingOptionNames = incomingGroup.options.map(o => o.name);

    // Get all active variants for this variant type and menu item
    const activeVariantsForType = await prisma.menuVariant.findMany({
      where: {
        menuItemId,
        variantTypeId: variantType.id,
        deletedAt: null
      }
    });

    for (const existing of activeVariantsForType) {
      if (!incomingOptionNames.includes(existing.name)) {
        await prisma.menuVariant.update({
          where: { id: existing.id },
          data: { deletedAt: new Date() }
        });
      }
    }
  }

  // 4️⃣ Smart cleanup: Soft delete variants and unused variant types
  for (const existingType of existingVariantTypes) {
    if (!incomingVariantTypeNames.includes(existingType.name) && existingType.options.length > 0) {
      // Step 1: Soft delete all variants for this variant type and menu item
      await prisma.menuVariant.updateMany({
        where: {
          menuItemId,
          variantTypeId: existingType.id,
          deletedAt: null
        },
        data: { deletedAt: new Date() }
      });

      // Step 2: Check if this variant type is still used by other menu items
      const otherActiveUsage = await prisma.menuVariant.count({
        where: {
          variantTypeId: existingType.id,
          deletedAt: null,
          menuItem: {
            merchantId, // Only check within same merchant
            id: { not: menuItemId }
          }
        }
      });

      // Step 3: Soft delete variant type if no other menu items use it
      if (otherActiveUsage === 0) {
        await prisma.menuVariantType.update({
          where: { id: existingType.id },
          data: { deletedAt: new Date() }
        });

        console.log(`Cleaned up unused variant type: ${existingType.name}`);
      } else {
        console.log(`Kept variant type ${existingType.name} - used by ${otherActiveUsage} other menu items`);
      }
    }
  }
}

// create menu in stalls
exports.createMenuStall = async (data) => {
  const { subCategoryName, category, merchantId, stallId, variantGroups } = data;

  // Use database transaction to ensure all-or-nothing creation
  return await prisma.$transaction(async (tx) => {
    try {
      // 1. Handle subcategory
      let subCategory = null;
      if (subCategoryName) {
        subCategory = await ensureSubCategory({ name: subCategoryName, category, merchantId });
      }

      // 2. Create menu item
      const allowedFields = ['name', 'price', 'description', 'category', 'available', 'merchantId', 'stallId'];
      const cleanedData = sanitize(data, allowedFields);

      const menuItem = await tx.menuItem.create({
        data: {
          ...cleanedData,
          subCategoryId: subCategory?.id || null,
        },
        include: { images: true, subCategory: true },
      });

      // 3. Create variants with validation
      if (variantGroups?.length) {
        await handleVariantGroupsWithValidation(tx, variantGroups, menuItem.id, merchantId);
      }

      // 
      return menuItem;

    } catch (error) {
      console.error('Menu item creation failed:', error);
      throw new Error(`Failed to create menu item: ${error.message}`);
    }
  });
};


// get menus stalls
exports.getByIdMenu = async (id) => {
  return await prisma.menuItem.findUnique({
    where: { id },
    include: { images: true, subCategory: true, menuVariants: { where: { menuItemId: id } } },
  });
}
exports.initMenuStalls = async (stallId) => {
  const stall = await prisma.stall.findUnique({
    where: { id: stallId },
    include: {
      menuItems: true
    }
  });
  return stall.menuItems;
};

// stall setting
exports.initSettingsStalls = async (stallId) => {
  result = {}
  const stall = await prisma.stall.findUnique({
    where: { id: stallId },
    include: {
      schedules: true,
      overrides: true,
      images: {
        where: { type: 'logo' }
      }
    }
  });

  const admins = await prisma.adminMerchant.findFirst({
    where: { stallId },
    include: {
      admin: { select: { email: true, name: true } }

    }
  })
  result.stall = stall
  result.admin = admins.admin
  return result;
};
exports.updateSettingsStall = async (stallId, data, dataImage) => {
  const {
    nameStall,
    description,
    nameUser,
    emailUser,
    password,
    schedules,
    overrides,
    logo
  } = data;
  console.log(nameStall, description, nameUser, emailUser, password, schedules, overrides, logo);
  try {
    // Start transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Get current stall with admin info
      const currentStall = await tx.stall.findUnique({
        where: { id: stallId },
        include: {
          admins: {
            include: {
              admin: true
            }
          },
          schedules: true,
          overrides: true,
          images: {
            where: { type: 'logo' }
          }
        }
      });

      if (!currentStall) {
        throw new Error('Stall tidak ditemukan');
      }

      // 2. Update stall basic info
      const updatedStall = await tx.stall.update({
        where: { id: stallId },
        data: {
          name: nameStall,
          description: description
        }
      });

      // 3. Update admin user info
      const adminRelation = currentStall.admins[0]; // Assuming first admin
      if (adminRelation && adminRelation.admin) {
        const updateAdminData = {
          name: nameUser,
          email: emailUser
        };

        // Only update password if provided
        if (password) {
          const saltRounds = 10;
          updateAdminData.password = await bcrypt.hash(password, saltRounds);
        }

        await tx.adminUser.update({
          where: { id: adminRelation.adminId },
          data: updateAdminData
        });
      }

      // 4. Update schedules
      if (schedules && schedules.length > 0) {
        // Delete existing schedules
        await tx.stallSchedule.deleteMany({
          where: { stallId: stallId }
        });

        // Create new schedules
        const scheduleData = schedules.map(schedule => ({
          stallId: stallId,
          dayOfWeek: schedule.dayOfWeek,
          openHour: schedule.openHour,
          closeHour: schedule.closeHour,
          closed: schedule.closed || false
        }));

        await tx.stallSchedule.createMany({
          data: scheduleData
        });
      }

      // 5. Update overrides
      if (overrides && overrides.length > 0) {
        // Delete existing overrides
        await tx.stallOverride.deleteMany({
          where: { stallId: stallId }
        });

        // Create new overrides
        const overrideData = overrides.map(override => ({
          stallId: stallId,
          date: new Date(override.date),
          isOpen: override.isOpen,
          note: override.note || null
        }));

        await tx.stallOverride.createMany({
          data: overrideData
        });
      }

      // 6. Handle logo upload
      // if (logo) {
      //   try {
      //     // Delete existing logo
      //     const existingLogo = currentStall.images.find(img => img.type === 'logo');
      //     if (existingLogo) {
      //       // Delete file from filesystem
      //       const oldFilePath = path.join(process.cwd(), 'public', existingLogo.path);
      //       try {
      //         await fs.unlink(oldFilePath);
      //       } catch (fileErr) {
      //         console.warn('Could not delete old logo file:', fileErr.message);
      //       }

      //       // Delete from database
      //       await tx.image.delete({
      //         where: { id: existingLogo.id }
      //       });
      //     }

      //     // Save new logo
      //     const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'stalls', stallId);
      //     await fs.mkdir(uploadDir, { recursive: true });

      //     const fileExtension = path.extname(logo.originalname);
      //     const fileName = `logo-${Date.now()}${fileExtension}`;
      //     const filePath = path.join(uploadDir, fileName);
      //     const relativePath = `/uploads/stalls/${stallId}/${fileName}`;

      //     // Save file
      //     await fs.writeFile(filePath, logo.buffer);

      //     // Save to database
      //     await tx.image.create({
      //       data: {
      //         stallId: stallId,
      //         type: 'logo',
      //         path: relativePath,
      //         url: relativePath,
      //         originalName: logo.originalname,
      //         mimeType: logo.mimetype,
      //         size: logo.size
      //       }
      //     });

      //   } catch (uploadErr) {
      //     console.error('Logo upload error:', uploadErr);
      //     throw new Error('Gagal mengunggah logo');
      //   }
      // }

      return updatedStall;
    });

    // Return updated stall with relations
    const finalResult = await prisma.stall.findUnique({
      where: { id: stallId },
      include: {
        admins: {
          include: {
            admin: {
              select: {
                id: true,
                name: true,
                email: true,

              }
            }
          }
        },
        schedules: {
          orderBy: { dayOfWeek: 'asc' }
        },
        overrides: {
          orderBy: { date: 'asc' }
        },
        images: {
          where: { type: 'logo' }
        }
      }
    });

    return finalResult;

  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

exports.initUserStalls = async (merchantId) => {
  const result = {
    stats: {},
    stalls: [],
  }
  const stalls = await prisma.stall.findMany({
    where: { merchantId },
    include: {
      admins: {
        include: {
          admin: {   // ← ini relasi ke AdminUser
            select: { email: true }
          }
        }
      }
    }
  })
  result.stalls = stalls.map((stall) => ({
    id: stall.id,
    name: stall.name,
    email: stall.admins[0]?.admin?.email || null,
    category: stall.description,
    status: stall.active ? "Active" : "Inactive",
    setupComplete: stall.setupComplete,
    lastLogin: stall.lastLogin,
    createdAt: stall.createdAt

  }));
  // stats Total
  result.stats.total = stalls.length
  // stats inactive
  const inactiveStalls = stalls.filter((stall) => stall.active === false);
  result.stats.inactive = inactiveStalls.length;
  // stats setupComplete
  const setupCompleteStalls = stalls.filter((stall) => stall.setupComplete === true);
  result.stats.setupComplete = setupCompleteStalls.length;
  // stats pending
  const pendingStalls = stalls.filter((stall) => stall.setupComplete === false);
  result.stats.pendingSetup = pendingStalls.length;
  return result

};
exports.initStalls = async (merchantId) => {
  const result = { stats: {}, stalls: [] }

  // Ambil semua stalls
  const stalls = await prisma.stall.findMany({
    where: { merchantId },
    include: {
      _count: { select: { menuItems: true } },  // ✅ hitung jumlah menuItems
      admins: {
        include: {
          admin: { select: { email: true, name: true } }
        }
      }
    }
  })

  // Hitung basic stats
  const total = stalls.length
  const active = stalls.filter(s => s.active).length
  const inactive = stalls.filter(s => !s.active).length
  const maintenance = stalls.filter(s => !s.setupComplete).length

  // Range waktu bulan ini
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  // Ambil sales per stall
  const sales = await prisma.orderItem.groupBy({
    by: ["stallId"],
    _sum: { totalPrice: true },
    where: {
      stallId: { in: stalls.map(s => s.id) },
      order: {
        merchantId,
        paid: true,
        status: "COMPLETED",
        createdAt: { gte: startOfMonth }
      }
    }
  })

  const salesMap = sales.reduce((acc, s) => {
    acc[s.stallId] = s._sum.totalPrice || 0
    return acc
  }, {})

  // Revenue total = sum semua sales
  const revenue = Object.values(salesMap).reduce((a, b) => a + b, 0)

  // Susun stalls data
  result.stalls = stalls.map(stall => ({
    id: stall.id,
    name: stall.name,
    email: stall.admins[0]?.admin?.email || null,
    operator: stall.admins[0]?.admin?.name || null,
    category: stall.description,
    status: stall.active ? "Active" : "Inactive",
    menuItems: stall._count.menuItems,
    monthlySales: salesMap[stall.id] || 0
  }))

  // Susun stats
  result.stats = { total, active, inactive, maintenance, revenue }

  return result
}

exports.resetPassword = async (stallId, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const stall = await prisma.stall.findUnique({
    where: { id: stallId },
    include: {
      admins: {
        include: {
          admin: {   // ← ini relasi ke AdminUser
            select: { id: true, email: true }
          }
        }
      }
    }
  })
  console.log(stall.admins[0].admin.id);
  // const result = await prisma.adminUser.update({
  //   where: { id: stall.admins.admin.id },
  //   data: { password: hashedPassword }
  // })

  const result = await prisma.adminUser.update({
    where: { id: stall.admins[0].admin.id },
    data: { password: hashedPassword }
  })
  return result
}

exports.toggleStatus = async (stallId) => {
  const stall = await prisma.stall.findUnique({
    where: { id: stallId },
    include: {
      admins: {
        include: {
          admin: {   // ← ini relasi ke AdminUser
            select: { id: true, email: true }
          }
        }
      }
    }
  })
  const result = await prisma.stall.update({
    where: { id: stallId },
    data: { active: !stall.active }
  })
  return result
}
exports.createUserStall = async (dataBody) => {
  console.log(dataBody);

  const hashedPassword = await bcrypt.hash(dataBody.password, 10)
  try {
    // Input validation
    if (!dataBody.name || !dataBody.email || !dataBody.merchantId) {
      throw new Error("Missing required fields: name, email, or merchantId");
    }

    // Use Prisma transaction to ensure all operations succeed or all fail
    const result = await prisma.$transaction(async (tx) => {
      // Create User
      const user = await tx.adminUser.create({
        data: {
          name: dataBody.name,
          email: dataBody.email,
          password: hashedPassword,
          createdAt: new Date(),
        },
      });
      console.log("user", user);

      // Create Stalls
      const stall = await tx.stall.create({
        data: {
          name: dataBody.name,
          description: dataBody.category,
          merchantId: dataBody.merchantId,
          active: true,
          createdAt: new Date(),
        },
      });

      // Create admin merchant
      const adminMerchant = await tx.adminMerchant.create({
        data: {
          adminId: user.id,
          merchantId: dataBody.merchantId,
          stallId: stall.id,
          role: "STALL_OWNER",
          createdAt: new Date(),
        },
      });
      console.log("adminMerchant", adminMerchant);
      console.log("stall", stall);
      console.log("user", user);
      return {
        user,
        stall,
        adminMerchant,
      };
    }, {
      maxWait: 5000, // default: 2000
      timeout: 10000, // default: 5000
    });

    return result;
  } catch (error) {
    console.error("Transaction failed:", error);

    // You can add specific error handling here
    if (error.code === 'P2002') {
      throw new Error("User with this email already exists");
    }

    throw error; // Re-throw the error so the controller can handle it
  }
};

exports.createBulkUserStalls = async (stallsData) => {
  console.log("Bulk stalls data:", stallsData);

  const results = {
    created: [],
    failed: []
  };

  try {
    // Process each stall in a separate transaction for better error isolation
    for (let i = 0; i < stallsData.length; i++) {
      const dataBody = stallsData[i];

      try {
        // Input validation for each item
        if (!dataBody.name || !dataBody.email || !dataBody.merchantId || !dataBody.password) {
          throw new Error(`Missing required fields for item ${i + 1}: name, email, password, or merchantId`);
        }

        const hashedPassword = await bcrypt.hash(dataBody.password, 10);

        // Use Prisma transaction for each stall creation
        const result = await prisma.$transaction(async (tx) => {
          // Check if user with email already exists
          const existingUser = await tx.adminUser.findUnique({
            where: { email: dataBody.email }
          });

          if (existingUser) {
            throw new Error(`User with email ${dataBody.email} already exists`);
          }

          // Create User
          const user = await tx.adminUser.create({
            data: {
              name: dataBody.name,
              email: dataBody.email,
              password: hashedPassword,
              createdAt: new Date(),
            },
          });

          // Create Stalls
          const stall = await tx.stall.create({
            data: {
              name: dataBody.name,
              description: dataBody.category || null,
              merchantId: dataBody.merchantId,
              active: true,
              createdAt: new Date(),
            },
          });

          // Create admin merchant
          const adminMerchant = await tx.adminMerchant.create({
            data: {
              adminId: user.id,
              merchantId: dataBody.merchantId,
              stallId: stall.id,
              role: "STALL_OWNER",
              createdAt: new Date(),
            },
          });

          return {
            user,
            stall,
            adminMerchant,
          };
        }, {
          maxWait: 5000,
          timeout: 10000,
        });

        results.created.push({
          index: i + 1,
          email: dataBody.email,
          name: dataBody.name,
          data: result
        });

        console.log(`Successfully created stall and user for ${dataBody.email}`);

      } catch (error) {
        console.error(`Failed to create stall and user for item ${i + 1}:`, error);

        results.failed.push({
          index: i + 1,
          email: dataBody.email || 'Unknown',
          name: dataBody.name || 'Unknown',
          error: error.message
        });
      }
    }

    console.log(`Bulk operation completed. Created: ${results.created.length}, Failed: ${results.failed.length}`);
    return results;

  } catch (error) {
    console.error("Bulk creation operation failed:", error);
    throw error;
  }
};