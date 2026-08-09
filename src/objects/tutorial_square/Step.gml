/// gml_Object_tutorial_square_Step_0
// locals: __b__
proto1 = window_get_width();
proto2 = window_get_height();
if (os_type == 4) {
    if (proto1 > proto2) {
        went = 0;
    } else {
        went = 100;
    }
}
if (os_type == 0) {
    went = 0;
}
if (phase == 5) {
    if (instance_number(sold13) == 0) {
        phase = 6;
    }
}
if (phase == 9) {
    if (instance_number(casa1) >= 5) {
        phase = 10;
    }
}
if (phase == 12) {
    if (instance_number(industria1) > tutind) {
        phase = 13;
    }
}
if (phase == 16) {
    if (instance_number(parco) > tutpar) {
        phase = 17;
    }
}
if (phase == 19) {
    if (instance_number(rocket_launcher) > tutrl) {
        phase = 20;
    }
}
__b__ = action_if_variable(phase, 2, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 11, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        phase = 3;
    }
}
__b__ = action_if_variable(phase, 7, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 0, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        phase = 8;
    }
}
__b__ = action_if_variable(phase, 8, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        phase = 9;
    }
}
