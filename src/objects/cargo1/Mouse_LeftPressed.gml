/// gml_Object_cargo1_Mouse_4
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(preso, 0, 0);
if (__b__) {
    action_effect(2, 213, 150, 2, 16744448, 0);
    action_effect(2, 392, 250, 2, 16744448, 0);
    action_effect(2, 759, 450, 2, 16744448, 0);
    action_set_relative(0);
    preso = 1;
    action_set_relative(1);
    action_sprite_set(cargo1v, 0, 1);
    with (r12) {
        mon = mon + irandom_range(2000, 3000);
    }
}
action_set_relative(0);
