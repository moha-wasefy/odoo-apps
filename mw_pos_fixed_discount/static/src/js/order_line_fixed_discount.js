odoo.define('mw_pos_fixed_discount.order_line_fixed_discount', function(require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { useListener } = require('web.custom_hooks');
    const Registries = require('point_of_sale.Registries');
    var models = require("point_of_sale.models");


    class orderLineFixedDiscountButton extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this.onClick);
        }
        async onClick() {
            var self = this;
            const { confirmed, payload } = await this.showPopup('NumberPopup',{
                title: this.env._t('Discount Percentage'),
                startingValue: 0,
                isInputSelected: true
            });
            if (confirmed) {
                const val = payload;
                await self.apply_discount(val);
            }
        }
        async apply_discount(amount) {
            var orderline = this.env.pos.get_order().get_selected_orderline();
            if (orderline) {
//              amount to percentage
                var orderLinePrice = orderline.get_unit_price();
                var orderLineQty = orderline.get_quantity();
                var orderLinePriceTotal = orderLinePrice * orderLineQty;
                var discountPercentage = (amount / orderLinePriceTotal) * 100;
                console.log('orderLinePrice', orderLinePrice);
                console.log('discountPercentage', discountPercentage);
                console.log('orderLineQty', orderLineQty);
                console.log('orderLinePriceTotal', orderLinePriceTotal);
                console.log('discountPercentage', discountPercentage);

                orderline.set_discount(parseFloat(discountPercentage).toFixed(2));
//                get orderline discount
                var orderlineDiscount = orderline.get_discount();
                console.log('orderlineDiscount', orderlineDiscount);

            }
        }
    }
    orderLineFixedDiscountButton.template = 'orderLineFixedDiscountButton';


    ProductScreen.addControlButton({
        component: orderLineFixedDiscountButton,
        condition: function() {
            return this.env.pos.config.enable_fixed_discount;
        },
    });

    Registries.Component.add(orderLineFixedDiscountButton);

    return orderLineFixedDiscountButton;
});
