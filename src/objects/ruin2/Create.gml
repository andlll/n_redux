/// gml_Object_ruin2_Create_0
// locals: __b__
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
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(ru21, 0, 1);
    } else {
        action_sprite_set(ru22, 0, 1);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(ru23, 0, 1);
    } else {
        action_sprite_set(ru24, 0, 1);
    }
}
