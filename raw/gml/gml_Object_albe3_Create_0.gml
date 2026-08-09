/// gml_Object_albe3_Create_0
// locals: __b__
depth = -y;
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(a31, 0, 1);
    } else {
        action_sprite_set(a32, 0, 1);
    }
    exit;
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(a33, 0, 1);
    } else {
        action_sprite_set(a34, 0, 1);
    }
    exit;
}
