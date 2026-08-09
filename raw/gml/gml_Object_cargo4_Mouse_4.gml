/// gml_Object_cargo4_Mouse_4
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(preso, 0, 0);
if (__b__) {
    action_effect(2, 246, 155, 2, 65280, 0);
    action_effect(2, 375, 227, 2, 65280, 0);
    action_set_relative(0);
    preso = 1;
    action_set_relative(1);
    action_sprite_set(cargo4v, 0, 1);
    with (r12) {
        oil = oil + irandom_range(2000, 3000);
    }
}
action_set_relative(0);
