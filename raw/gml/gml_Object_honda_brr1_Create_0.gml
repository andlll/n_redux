/// gml_Object_honda_brr1_Create_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_dice(2);
if (__b__) {
    action_create_object(honda_brr11, 2907, 1027);
    action_kill_object();
}
__b__ = action_if_dice(2);
if (__b__) {
    action_create_object(honda_brr12, 2907, 1027);
    action_kill_object();
}
__b__ = action_if_number(736, 1, 0);
if (__b__) {
    action_set_relative(1);
    action_move_to(21, -26);
    action_set_relative(0);
}
action_set_alarm(200, 0);
action_set_alarm(427, 1);
action_set_motion(210, 3);
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
