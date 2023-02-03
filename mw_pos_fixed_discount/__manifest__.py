{
    'name': "POS Fixed Discount",
    "summary": "User able to add fixed discount to the pos order line."
               "- Allow from the pos configuration.",
    'author': "Mohammed Alwasefy",
    'maintainer': 'Mohammed Alwasefy(mohammed.alwasefy@gmail.com)',
    "license": "AGPL-3",
    'category': 'Point Of Sale',
    'version': '15.0.1',
    "depends": ["point_of_sale"],
    "application": True,
    "data": [
             'views/pos_config.xml',
            ],
    'assets': {
        'point_of_sale.assets': [
            'mw_pos_fixed_discount/static/src/js/order_line_fixed_discount.js',
        ],
        'web.assets_qweb': [
            'mw_pos_fixed_discount/static/src/xml/pos.xml'
        ]
    },
}
