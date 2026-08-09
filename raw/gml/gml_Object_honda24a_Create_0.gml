/// gml_Object_honda24a_Create_0
// locals: __b__
action_set_relative(1);
__b__ = action_if_number(736, 1, 0);
if (__b__) {
    action_move_to(21, -26);
}
action_set_relative(0);
action_set_alarm(285, 0);
action_set_relative(1);
action_set_relative(0);
action_set_alarm(304, 1);
action_set_relative(1);
action_set_relative(0);
action_set_motion(210, 3);
action_set_relative(1);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
action_set_relative(0);
