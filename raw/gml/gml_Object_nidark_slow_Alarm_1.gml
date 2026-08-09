/// gml_Object_nidark_slow_Alarm_1
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    action_sprite_set(n3d, 0, 1);
} else {
    action_sprite_set(n2d, 0, 1);
}
