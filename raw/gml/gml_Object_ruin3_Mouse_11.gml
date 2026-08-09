/// gml_Object_ruin3_Mouse_11
// locals: __b__
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
with (aura) {
    __b__ = action_if_variable(dawn, 0, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (aura) {
        __b__ = action_if_variable(night, 0, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_color(16777215, 1);
    }
}
with (cc5000) {
    action_kill_object();
}
