/// gml_Object_albe2_Create_0
// locals: __b__
depth = -y;
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(a21, 0, 1);
    } else {
        action_sprite_set(a22, 0, 1);
    }
    exit;
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(a23, 0, 1);
    } else {
        action_sprite_set(a24, 0, 1);
    }
    exit;
}
