/// gml_Object_r12_KeyPress_65
// locals: __b__
with (pu4prov) {
    __b__ = action_if_variable(unlos, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        selec = 4;
    }
    __b__ = action_if_variable(os_type, 0, 0);
    if (__b__) {
        action_set_cursor(1372, 0);
    }
}
