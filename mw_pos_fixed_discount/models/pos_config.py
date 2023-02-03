from odoo import fields, models, api


class PosConfig(models.Model):
    _inherit = 'pos.config'

    enable_fixed_discount = fields.Boolean(
        "Active Fixed Discount",)
