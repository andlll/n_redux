/// gml_Object_honda31b_Step_0
// locals: __b__
__b__ = action_if_number(736, 0, 0);
if (__b__) {
    __b__ = action_if_number(291, 0, 0);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(dara, 0, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            with (r12) {
                __b__ = action_if_variable(oil, 0, 3);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                action_kill_object();
            }
        }
    }
}
depth = -y - 16;
