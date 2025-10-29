const { pos } = require('../../../models/client');
const { imageService } = require("../services/imageService");


function normalizePhoneNumber(number) {
  if (!number) return null;
  const cleaned = number.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) return '+62' + cleaned.slice(1);
  if (cleaned.startsWith('62')) return '+62' + cleaned.slice(2);
  if (cleaned.startsWith('+62')) return cleaned;
  return '+62' + cleaned;
}

const orderService = {
  async create(data) {
    const {
      merchantSlug,
      tableId,
      customerName,
      customerPhone,
      specialInstructions,
      items,
      total,
    } = data;

    // 1. Fetch merchant and menuItems with variants
    const merchant = await pos.merchant.findUnique({
      where: { slug: merchantSlug },
      include: {
        menuItems: { include: { menuVariants: true } },
      },
    });
    if (!merchant || !merchant.menuItems) {
      throw new Error("Merchant not found or has no menu items");
    }

    const taxPercentage = merchant.taxPercentage || 0;
    const serviceChargePercentage = merchant.serviceChargePercentage || 0;

    // 2. Validate items and compute subtotal
    let subtotal = 0;
    const orderItemsData = [];

    for (const item of items) {
      const menuItem = merchant.menuItems.find(m => m.id === item.menuId);
      if (!menuItem) {
        throw new Error(`Menu item ${item.menuId} not found for this merchant`);
      }

      let itemSubtotal = menuItem.price;
      const variantData = [];

      for (const selected of item.selectedVariants || []) {
        const variant = menuItem.menuVariants.find(v => v.id === selected.variantId);
        if (!variant) {
          throw new Error(`Variant ${selected.variantId} is not valid for menu item ${menuItem.name}`);
        }

        itemSubtotal += selected.extraPrice;
        variantData.push({
          variantId: variant.id, // Only variantId is needed for the relation
        });
      }

      const unitPrice = itemSubtotal;
      const totalPrice = itemSubtotal * item.qty;
      subtotal += totalPrice;

      orderItemsData.push({
        menuItemId: menuItem.id,
        quantity: item.qty,
        unitPrice: unitPrice,     // ✅ Added missing field
        totalPrice: totalPrice,   // ✅ Added missing field
        note: item.note,
        selectedVariants: variantData,
      });
    }

    // 3. Compute tax and service charge
    const tax = Math.round((subtotal * taxPercentage) / 100);
    const serviceCharge = Math.round((subtotal * serviceChargePercentage) / 100);
    const computedTotal = subtotal + tax + serviceCharge;

    if (computedTotal !== total) {
      throw new Error(`Total mismatch: expected ${computedTotal}, but got ${total}`);
    }

    // 4. Normalize WhatsApp & upsert contact
    let whatsappContact = null;
    if (customerPhone) {
      const normalized = normalizePhoneNumber(customerPhone);
      whatsappContact = await pos.whatsAppContact.upsert({
        where: { number: normalized },
        update: { name: customerName },
        create: { number: normalized, name: customerName },
      });
    }

    // 5. Create order
    const order = await pos.order.create({
      data: {
        merchantId: merchant.id,
        tableId,
        customerName,
        subtotal,
        taxAmount: tax,
        serviceCharge,
        totalAmount: computedTotal,
        whatsappId: whatsappContact?.id, // ✅ Fixed: should be whatsappId, not waContactId
        items: {
          create: orderItemsData.map(item => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,     // ✅ Added missing field
            totalPrice: item.totalPrice,   // ✅ Added missing field
            note: item.note,
            variants: {                    // ✅ Fixed: should be 'variants', not 'orderItemVariants'
              create: item.selectedVariants.map(v => ({
                variantId: v.variantId,    // ✅ Simplified: only variantId needed
              })),
            },
          })),
        },
      },
      include: {
        items: {                          // ✅ Fixed: should be 'items', not 'orderItems'
          include: {
            variants: true,               // ✅ Fixed: should be 'variants', not 'orderItemVariants'
            menuItem: true,               // ✅ Added: include menu item details
          }
        },
        whatsappContact: true,            // ✅ Fixed: should be 'whatsappContact', not 'waContact'
      },
    });

    return order;
  },

  async updatePaymentStatus(id, orderData) {
    // ✅ Fixed: Use correct field names according to schema
    const existingOrder = await pos.order.findUnique({ where: { id } });
    if (!existingOrder) {
      throw new Error("Order not found");
    }
    const updateData = {
      paid: orderData.paid ? true : false,
      status: orderData.status ? orderData.status : "PENDING",
    };

    // Only add paymentMethodId if provided
    if (orderData.paymentMethodId) {
      updateData.paymentMethodId = orderData.paymentMethodId;
    }

    // Only add customerName if provided
    if (orderData.customerName) {
      updateData.customerName = orderData.customerName;
    }

    // Handle WhatsApp number update
    if (orderData.whatsappNumber) {
      console.log("CustomerName", existingOrder.customerName)
      const normalized = normalizePhoneNumber(orderData.whatsappNumber);
      const whatsappContact = await pos.whatsAppContact.upsert({
        where: { number: normalized },
        update: {},
        create: { name: existingOrder.customerName, number: normalized },
      });
      updateData.whatsappId = whatsappContact.id;

    }
    console.log("UPDATE PAYMENT STATUS", updateData);
    return await pos.order.update({
      where: { id: orderData.orderId },
      data: updateData,
    });
  },
  async updatePaymentProof(id, orderData) {
    let paymentProofUrl = null;
    const existingOrder = await pos.order.findUnique({ where: { id: orderData.orderId }, include: { images: true } });
    if (orderData.paymentProof) {

      const imageData = await imageService.saveImage({
        file: orderData.paymentProof,
        type: 'paymentProof',
        folder: 'paymentProof',
        storage: 'cloudinary',
        orderId: orderData.orderId,
      });
      paymentProofUrl = imageData.url;
    }
    if (!paymentProofUrl)
      throw new Error("Payment proof  upload is failed");
    // ✅ Fixed: Use correct field names according to schema
    const updateData = {
      paid: orderData.paid ? true : false,
      status: orderData.status ? orderData.status : "PENDING",
    };

    // Only add paymentMethodId if provided
    if (orderData.paymentMethodId) {
      updateData.paymentMethodId = orderData.paymentMethodId;
    }




    console.log("UPDATE PAYMENT STATUS", updateData);
    return await pos.order.update({
      where: { id },
      data: updateData,
    });
  },
  async getById(id) {
    const order = await pos.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            variants: {
              include: {
                variant: true, // Include the actual MenuVariant details
              },
            },
            menuItem: {
              include: {
                images: true,
              },
            },
          },
        },
        whatsappContact: true,
        customer: true,
        table: true,
        merchant: {
          select: {
            id: true,
            name: true,
            slug: true,
            themeColor: true,
          },
        },
        paymentMethod: {
          include: {
            images: true,
          },
        },
        images: true,
        chatMessages: {
          orderBy: {
            timestamp: 'asc',
          },
        },
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    // Transform the response to remove unnecessary nested IDs
    const cleanOrder = {
      id: order.id, // ✅ Keep - needed for operations
      customerName: order.customerName,
      status: order.status,
      paid: order.paid,
      subtotal: order.subtotal,
      discountAmount: order.discountAmount,
      taxAmount: order.taxAmount,
      serviceCharge: order.serviceCharge,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,

      // Clean merchant data - display only
      merchant: order.merchant ? {
        id: order.merchant.id,
        name: order.merchant.name,
        slug: order.merchant.slug,
        themeColor: order.merchant.themeColor,
      } : null,

      // Clean table data - display only
      table: order.table ? {
        name: order.table.name,
      } : null,

      // Clean customer data - display only
      customer: order.customer ? {
        name: order.customer.name,
        phone: order.customer.phone,
      } : null,

      // Clean WhatsApp contact - display only
      whatsappContact: order.whatsappContact ? {
        number: order.whatsappContact.number,
        name: order.whatsappContact.name,
      } : null,

      // Clean payment method - display only
      paymentMethod: order.paymentMethod ? {
        name: order.paymentMethod.name,
        accountNumber: order.paymentMethod.accountNumber,
        accountName: order.paymentMethod.accountName,
        type: order.paymentMethod.type,
        images: order.paymentMethod.images?.map(img => ({
          url: img.url,
          type: img.type,
        })) || [],
      } : null,

      // Clean items - no internal IDs
      items: order.items.map(item => ({
        name: item.menuItem.name,
        description: item.menuItem.description,
        category: item.menuItem.category,
        basePrice: item.menuItem.price,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        note: item.note,
        images: item.menuItem.images?.map(img => ({
          url: img.url,
          type: img.type,
        })) || [],
        variants: item.variants.map(variant => ({
          name: variant.variant.name,
          extraPrice: variant.variant.extraPrice,
        })),
      })),
      image: order.images?.map(img => ({
        url: img.url,
        type: img.type,
      })) || [],
      // Clean chat messages - display only
      chatMessages: order.chatMessages.map(msg => ({
        sender: msg.sender,
        content: msg.content,
        type: msg.type,
        timestamp: msg.timestamp,
      })),
    };

    return cleanOrder;
  },
  async getMultiple(orders) {
    const orderIds = orders.ids

    const orderList = await pos.order.findMany({
      where: { id: { in: orderIds } },
      include: {
        items: {
          include: {
            menuItem: {
              include: {
                images: true,
              },
            },
            variants: {
              include: {
                variant: true,
              },
            },
          },
        },
        whatsappContact: true,
        customer: true,
        table: true,
        merchant: {
          select: {
            id: true,
            name: true,
            slug: true,
            themeColor: true,
          },
        },
        paymentMethod: {
          include: {
            images: true,
          },
        },
        chatMessages: {
          orderBy: {
            timestamp: 'asc',
          },
        },
      },
    });

    const cleanOrders = orderList.map(order => ({
      id: order.id,
      customerName: order.customerName,
      status: order.status,
      paid: order.paid,
      subtotal: order.subtotal,
      discountAmount: order.discountAmount,
      taxAmount: order.taxAmount,
      serviceCharge: order.serviceCharge,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,

      merchant: order.merchant ? {
        id: order.merchant.id,
        name: order.merchant.name,
        slug: order.merchant.slug,
        themeColor: order.merchant.themeColor,
      } : null,

      table: order.table ? {
        name: order.table.name,
      } : null,

      customer: order.customer ? {
        name: order.customer.name,
        phone: order.customer.phone,
      } : null,

      whatsappContact: order.whatsappContact ? {
        number: order.whatsappContact.number,
        name: order.whatsappContact.name,
      } : null,

      paymentMethod: order.paymentMethod ? {
        name: order.paymentMethod.name,
        type: order.paymentMethod.type,
        images: order.paymentMethod.images?.map(img => ({
          url: img.url,
          type: img.type,
        })) || [],
      } : null,

      items: order.items.map(item => ({
        name: item.menuItem.name,
        description: item.menuItem.description,
        category: item.menuItem.category,
        basePrice: item.menuItem.price,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        note: item.note,
        images: item.menuItem.images?.map(img => ({
          url: img.url,
          type: img.type,
        })) || [],
        variants: item.variants.map(variant => ({
          name: variant.variant.name,
          extraPrice: variant.variant.extraPrice,
        })),
      })),

      chatMessages: order.chatMessages.map(msg => ({
        sender: msg.sender,
        content: msg.content,
        type: msg.type,
        timestamp: msg.timestamp,
      })),
    }));

    return cleanOrders;
  },
  async getByMerchant(merchantId, options = {}) {
    const {
      status,
      paid,
      tableId,
      customerPhone,
      limit = 50,
      offset = 0,
      orderBy = 'createdAt',
      orderDirection = 'desc',
    } = options;

    const where = { merchantId };

    // Add filters
    if (status) where.status = status;
    if (typeof paid === 'boolean') where.paid = paid;
    if (tableId) where.tableId = tableId;
    if (customerPhone) {
      const normalized = normalizePhoneNumber(customerPhone);
      where.whatsappContact = {
        number: normalized,
      };
    }

    const orders = await pos.order.findMany({
      where,
      include: {
        items: {
          include: {
            menuItem: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
            variants: {
              include: {
                variant: {
                  select: {
                    id: true,
                    name: true,
                    extraPrice: true,
                  },
                },
              },
            },
          },
        },
        whatsappContact: true,
        customer: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
        table: {
          select: {
            id: true,
            name: true,
          },
        },
        paymentMethod: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
      orderBy: {
        [orderBy]: orderDirection,
      },
      take: limit,
      skip: offset,
    });

    return orders;
  },

  async updateStatus(id, status) {
    // Validate status
    const validStatuses = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'CANCELLED', 'COMPLETED'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    return await pos.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: {
            menuItem: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        whatsappContact: true,
        table: true,
      },
    });
  },

  async updatePaymentStatus(id, orderData) {
    // ✅ Fixed: Use correct field names according to schema
    const existingOrder = await pos.order.findUnique({ where: { id } });
    const updateData = {
      paid: orderData.paid ? true : false,
      status: orderData.status ? orderData.status : "PENDING",
    };

    // Only add paymentMethodId if provided
    if (orderData.paymentMethodId) {
      updateData.paymentMethodId = orderData.paymentMethodId;
    }

    // Only add customerName if provided
    if (orderData.customerName) {
      updateData.customerName = orderData.customerName;
    }

    // Handle WhatsApp number update
    if (orderData.whatsappNumber) {
      console.log("CustomerName", existingOrder.customerName)
      const normalized = normalizePhoneNumber(orderData.whatsappNumber);
      const whatsappContact = await pos.whatsAppContact.upsert({
        where: { number: normalized },
        update: {},
        create: { name: existingOrder.customerName, number: normalized },
      });
      updateData.whatsappId = whatsappContact.id;
    }

    return await pos.order.update({
      where: { id },
      data: updateData,
    });
  },

  // ✅ SOFT DELETE - Recommended approach for POS systems
  async cancelOrder(id, reason = 'Cancelled by user') {
    const order = await pos.order.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    // Only allow cancellation for certain statuses
    const cancellableStatuses = ['PENDING', 'CONFIRMED'];
    if (!cancellableStatuses.includes(order.status)) {
      throw new Error(`Cannot cancel order with status: ${order.status}`);
    }

    return await pos.order.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        // You could add a cancellation reason field to your schema if needed
      },
    });
  },
};

module.exports = orderService;