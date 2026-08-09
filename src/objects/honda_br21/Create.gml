/// gml_Object_honda_br21_Create_0
// locals: __b__
action_move_to(228, 1257);
action_set_alarm(205, 0);
action_set_alarm(224, 1);
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
