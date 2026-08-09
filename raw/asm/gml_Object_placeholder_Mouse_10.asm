// gml_Object_placeholder_Mouse_10  locals=2 args=0 len=148
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 2
0000000C: conv.i.v
00000010: push.v making
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21DC0E8
00000038: push.imm.e 1
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 1352
0000004C: conv.i.v
00000050: call action_sprite_set(argc=3)
00000058: popz
0000005C: push.imm.e 616
00000060: pushenv 0x21DC0C4
00000064: push.imm.e 1
00000068: pop.v.i ult
00000070: popenv 0x41DC0B8
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.i 65280
00000084: conv.i.v
00000088: call action_sprite_color(argc=2)
00000090: popz