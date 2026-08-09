/// gml_Object_grutop_Create_0
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
action_set_alarm(600, 1);
depth = -y - 260;
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
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(gto, 0, 1);
        action_set_alarm(35, 2);
    } else {
        action_sprite_set(gtao, 0, 1);
        action_set_alarm(35, 3);
    }
} else {
    action_set_alarm(52, 7);
}
