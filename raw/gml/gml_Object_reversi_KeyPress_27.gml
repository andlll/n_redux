/// gml_Object_reversi_KeyPress_27
// locals: __b__
with (pu1) {
    __b__ = action_if_variable(menoo, 0, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_create_object(disba, 0, 0);
    action_set_alarm(30, 0);
} else {
    with (pu1) {
        menoo = 0;
    }
}
