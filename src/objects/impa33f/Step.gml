/// gml_Object_impa33f_Step_0
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
        ele = ele + -1;
    }
    with (r12) {
        mon = mon + -1;
    }
}
image_alpha = 0.7;
action_set_relative(0);
