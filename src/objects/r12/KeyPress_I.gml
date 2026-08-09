/// gml_Object_r12_KeyPress_73
// locals: __b__
__b__ = action_if_variable(noemi, 4, 0);
if (__b__) {
    with (faro1) {
        action_kill_object();
    }
    with (faro2) {
        action_kill_object();
    }
    action_create_object(r22, 1374, -64);
    action_create_object(mudr21, 1853, 263);
    action_create_object(moto2, 2183, 908);
    action_create_object(moto2, 2729, 1223);
    action_create_object(bridge_des2, 2363, 783);
    action_create_object(r32, -16, 1141);
    action_create_object(robbobaseobj, 565, 1720);
    action_create_object(mudr31, -16, 1153);
    action_create_object(moto2a, -32, 1997);
    action_create_object(moto12, 607, 1839);
    action_create_object(moto2a, 1659, 1996);
    action_create_object(mudr32, 1302, 1150);
    action_create_object(mudr34, 2027, 1105);
    action_create_object(mudr33, 2513, 1268);
    action_create_object(bridge_des, 208, 807);
    action_create_object(bridge_sin, 1375, 788);
} else {
    noemi = 0;
}
with (pugatling) {
    __b__ = action_if_variable(unlosei, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(os_type, 0, 0);
    if (__b__) {
        action_set_cursor(1372, 0);
    }
    with (r12) {
        selec = 62;
    }
}
