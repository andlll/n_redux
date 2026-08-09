/// gml_Object_albe_Create_0
// locals: __b__
selva = 0;
depth = -y;
__b__ = action_if_dice(5);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(a2, 0, 1);
    } else {
        action_sprite_set(a5, 0, 1);
    }
    exit;
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(a3, 0, 1);
        } else {
            action_sprite_set(a4, 0, 1);
        }
        exit;
    }
}
