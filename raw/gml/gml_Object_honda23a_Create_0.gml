/// gml_Object_honda23a_Create_0
// locals: __b__
action_set_alarm(410, 0);
action_set_alarm(429, 1);
action_set_motion(150, 3);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
