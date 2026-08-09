/// gml_Object_ruin2_Mouse_10
// locals: __b__
action_set_relative(1);
with (r12) {
    __b__ = action_if_variable(selec, 11, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(255, 1);
    action_create_object(cc2000, 0, -50);
}
action_set_relative(0);
