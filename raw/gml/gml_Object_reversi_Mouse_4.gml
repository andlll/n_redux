/// gml_Object_reversi_Mouse_4
// locals: __b__
__b__ = action_if_number(617, 0, 2);
if (__b__) {
    __b__ = action_if_number(8, 0, 0);
    if (__b__) {
        __b__ = action_if_number(9, 0, 0);
        if (__b__) {
            __b__ = action_if_number(10, 0, 0);
            if (__b__) {
                __b__ = action_if_number(11, 0, 0);
                if (__b__) {
                    __b__ = action_if_number(7, 0, 0);
                    if (__b__) {
                        __b__ = action_if_number(736, 0, 0);
                        if (__b__) {
                            action_save_game("nimsav");
                        }
                        __b__ = action_if_number(736, 0, 2);
                        if (__b__) {
                            action_save_game("nimsav_eas");
                        }
                        action_create_object(savvvvvco, 0, 0);
                    }
                }
            }
        }
    }
}
action_create_object(disba, 0, 0);
with (r12) {
    exiting = 1;
}
action_set_alarm(30, 0);
