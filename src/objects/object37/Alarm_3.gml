/// gml_Object_object37_Alarm_3
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(se2, 0, 1);
    } else {
        action_sprite_set(se4, 0, 1);
    }
} else {
    action_sprite_set(se3, 0, 1);
}
