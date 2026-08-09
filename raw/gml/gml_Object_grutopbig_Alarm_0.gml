/// gml_Object_grutopbig_Alarm_0
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(gr32, 0, 1);
        } else {
            action_sprite_set(gr33, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_sprite_set(gr34, 0, 1);
            } else {
                action_sprite_set(gr35, 0, 1);
            }
        } else {
            action_sprite_set(gr31, 0, 1);
        }
    }
}
action_set_alarm(70, 0);
