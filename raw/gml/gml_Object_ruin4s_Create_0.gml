/// gml_Object_ruin4s_Create_0
// locals: __b__
depth = -y + 3;
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
        action_sprite_set(ru41, 0, 1);
    } else {
        action_sprite_set(ru42, 0, 1);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(ru43, 0, 1);
    } else {
        action_sprite_set(ru44, 0, 1);
    }
}
