/// gml_Object_unloparcoo_Step_0
// locals: __b__
action_sprite_transform(global.sca * 0.5, global.sca * 0.5, 0, 0);
__b__ = action_if_number(618, 0, 2);
if (__b__) {
    action_move_to(pu7.x, pu7.y - 100 * global.sca);
}
