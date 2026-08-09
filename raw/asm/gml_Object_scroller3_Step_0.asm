// gml_Object_scroller3_Step_0  locals=2 args=0 len=124
// locals: arguments, __b__
00000000: push.imm.e 4
00000004: conv.i.v
00000008: push.imm.e 800
0000000C: conv.i.v
00000010: push.builtin.v mouse_y
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x20C2600
00000038: push.imm.e 1
0000003C: conv.i.v
00000040: call action_if_mouse(argc=1)
00000048: pop.v.v local.__b__
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x20C2600
00000060: push.v obj145.x
00000068: push.builtin.v mouse_x
00000070: sub.v.v
00000074: pop.v.v rshift