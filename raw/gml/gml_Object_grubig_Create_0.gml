/// gml_Object_grubig_Create_0
// locals: __b__
with (r12) {
    __b__ = action_if_variable(oil, 0, 3);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_kill_object();
}
depth = -y;
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
with (aura) {
    __b__ = action_if_variable(dawn, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(15201023, 1);
}
action_set_alarm(100, 0);
