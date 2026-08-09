/// gml_Object_thunder_Create_0
// locals: __b__
depth = -y - 5;
__b__ = action_if_dice(2);
if (__b__) {
    tha = 2;
    action_sprite_set(th2, 0, 1);
} else {
    tha = 1;
}
action_set_alarm(30, 0);
action_create_object(basediswa_t, 0, 0);
