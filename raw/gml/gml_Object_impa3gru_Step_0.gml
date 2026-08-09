/// gml_Object_impa3gru_Step_0
// locals: __b__
action_set_relative(1);
with (playbuttoner) {
    __b__ = action_if_variable(play, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        ele = ele + -5;
    }
    with (r12) {
        mon = mon + -5;
    }
}
action_set_relative(0);
