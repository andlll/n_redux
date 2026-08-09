/// gml_Object_smoko_aer_Create_0
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    action_sprite_set(cc2, 0, 1);
} else {
    action_sprite_set(cc3, 0, 1);
}
xsca = 2;
action_sprite_transform(2, 2, 0, 0);
action_set_alarm(36, 0);
