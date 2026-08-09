/// gml_Object_ruin1_Create_0
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
        action_sprite_set(ru11, 0, 1);
    } else {
        action_sprite_set(ru12, 0, 1);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(ru13, 0, 1);
    } else {
        action_sprite_set(ru14, 0, 1);
    }
}
