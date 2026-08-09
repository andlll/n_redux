/// gml_Object_honda_br1_Create_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_number(736, 1, 0);
if (__b__) {
    action_move_to(1085, 852);
}
action_set_alarm(285, 0);
action_set_alarm(304, 1);
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
__b__ = action_if_dice(2);
if (__b__) {
    action_set_relative(1);
    action_create_object(honda_br11, 0, 0);
    action_set_relative(0);
    action_kill_object();
}
__b__ = action_if_dice(3);
if (__b__) {
    action_set_relative(1);
    action_create_object(honda_br12, 0, 0);
    action_set_relative(0);
    action_kill_object();
}
__b__ = action_if_dice(4);
if (__b__) {
    action_set_relative(1);
    action_create_object(honda_br13, 0, 0);
    action_set_relative(0);
    action_kill_object();
}
action_set_relative(0);
