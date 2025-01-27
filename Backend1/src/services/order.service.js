const cartService = require("../services/cart.service.js")
const Address = require("../models/address.models.js")
const Order = require("../models/order.model.js")
const OrderItem=require("../models/orderItems.model.js")

async function createOrder(user, shippAddress) {
    let address;
    if (shippAddress._id) {
        let existAddress = await Address.findById(shippAddress._id)
        address = existAddress;
    }
    else {
        address = new Address(shippAddress)
        address.user = user;
        await address.save();
        
        // console.log(user)
        user.address.push(address)
        // user.addresses.push(address);
        // console.log("2")
        await user.save();
    }
    const cart = await cartService.findUserCart(user._id);

    // console.log(cart)
    const orderItems = [];
    for (const item of cart.cartItems) {
        
        const orderItem = new OrderItem({
            price: item.price,
            product: item.products,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
        })
        console.log(orderItem)

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);

    }

    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discount: cart.discounts,
        totalItem: cart.totalItem,
        shippAddress: address
    })

    const savedOrder = await createdOrder.save();
    return savedOrder;
}

async function placeOrder(orderId) {
    const order = await findOrderById(orderId)

    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";
    return await order.save();
}
async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId)

    order.orderStatus = "CONFIRMED";

    return await order.save();
}
async function shipOrder(orderId) {
    const order = await findOrderById(orderId)

    order.orderStatus = "SHIPPED";

    return await order.save();
}
async function deliverOrder(orderId) {
    const order = await findOrderById(orderId)

    order.orderStatus = "DELIVERED";

    return await order.save();
}
async function cancelledOrder(orderId) {
    const order = await findOrderById(orderId)

    order.orderStatus = "CANCELLED";

    return await order.save();
}
async function findOrderById(orderId) {
    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress")

    return order;
}
async function userOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean()

        return orders;
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getAllOrders() {
    return await Order.find({ user: userId, orderStatus: "PLACED" })
        .populate({ path: "orderItems", populate: { path: "product" } }).lean()
}

async function deleteOrder(orderId) {
    const order = await findOrderByIdAndDelete(order._id)
}

module.exports = {
    createOrder, placeOrder, confirmedOrder, shipOrder, deleteOrder, cancelledOrder, findOrderById, userOrderHistory, getAllOrders, deleteOrder
}