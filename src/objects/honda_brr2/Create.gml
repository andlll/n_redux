/// gml_Object_honda_brr2_Create_0
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    action_create_object(honda_brr21, 0, 0);
    action_kill_object();
}
action_move_to(2368, 1257);
action_set_alarm(165, 0);
action_set_alarm(184, 1);
action_set_motion(30, 3);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
