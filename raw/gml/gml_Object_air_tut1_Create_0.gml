/// gml_Object_air_tut1_Create_0
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    sprite_index = 4;
}
action_set_motion(30, irandom_range(1, 3));
