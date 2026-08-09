/// gml_Object_honda_br2_Create_0
// locals: __b__
action_set_relative(1);
__b__ = action_if_dice(2);
if (__b__) {
    action_create_object(honda_br21, 0, 0);
    action_kill_object();
}
__b__ = action_if_dice(3);
if (__b__) {
    action_create_object(honda_br22, 0, 0);
    action_kill_object();
}
action_set_relative(0);
action_move_to(228, 1257);
action_set_relative(1);
action_set_relative(0);
action_set_alarm(205, 0);
action_set_relative(1);
action_set_relative(0);
action_set_alarm(224, 1);
action_set_relative(1);
action_set_relative(0);
action_set_motion(30, 3);
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
