/// gml_Object_mlsign_Mouse_4
// locals: __b__
with (r12) {
    selec = 0;
}
__b__ = action_if_variable(full, 0, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, 200, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        arm = 1;
    }
}
