/// gml_Object_playbuttoner_Step_0
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
image_alpha = 0.7;
__b__ = action_if_variable(play, 0, 0);
if (__b__) {
    with (impa31f) {
        alarm[0] = alarm[0] + 1;
    }
    with (impa31r) {
        alarm[0] = alarm[0] + 1;
    }
    __b__ = action_if_number(489, 0, 2);
    if (__b__) {
        with (impa3gru1) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(490, 0, 2);
    if (__b__) {
        with (impa3gru2) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(491, 0, 2);
    if (__b__) {
        with (impa3gru) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(488, 0, 2);
    if (__b__) {
        with (impa33f) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(492, 0, 2);
    if (__b__) {
        with (impa33r) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(486, 0, 2);
    if (__b__) {
        with (impa32f) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(487, 0, 2);
    if (__b__) {
        with (impa32r) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(483, 0, 2);
    if (__b__) {
        with (m3cant) {
            alarm[0] = alarm[0] + 1;
        }
    }
}
with (r12) {
    __b__ = action_if_variable(mon, 0, 3);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (impa31f) {
        alarm[0] = alarm[0] + 1;
    }
    with (impa31r) {
        alarm[0] = alarm[0] + 1;
    }
    __b__ = action_if_number(489, 0, 2);
    if (__b__) {
        with (impa3gru1) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(490, 0, 2);
    if (__b__) {
        with (impa3gru2) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(491, 0, 2);
    if (__b__) {
        with (impa3gru) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(488, 0, 2);
    if (__b__) {
        with (impa33f) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(492, 0, 2);
    if (__b__) {
        with (impa33r) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(486, 0, 2);
    if (__b__) {
        with (impa32f) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(487, 0, 2);
    if (__b__) {
        with (impa32r) {
            alarm[0] = alarm[0] + 1;
        }
    }
    __b__ = action_if_number(483, 0, 2);
    if (__b__) {
        with (m3cant) {
            alarm[0] = alarm[0] + 1;
        }
    }
}
