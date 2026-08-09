/// gml_Object_honda25_Create_0
// locals: __b__
action_set_alarm(196, 0);
action_set_alarm(215, 1);
action_set_motion(330, 3);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
