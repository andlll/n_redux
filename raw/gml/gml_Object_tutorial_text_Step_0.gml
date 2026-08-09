/// gml_Object_tutorial_text_Step_0
// locals: __b__
action_move_to(tutorial_square.x - 90, tutorial_square.y + 320);
__b__ = action_if_variable(du, 0, 0);
if (__b__) {
    __b__ = action_if_variable(num, 28, 0);
    if (__b__) {
        du = 1;
        action_set_alarm(600, 0);
    }
}
