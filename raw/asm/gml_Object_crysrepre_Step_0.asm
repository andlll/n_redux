// gml_Object_crysrepre_Step_0  locals=2 args=0 len=316
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 736
00000014: conv.i.v
00000018: call action_if_number(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21EE8E8
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 291
0000004C: conv.i.v
00000050: call action_if_number(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x21EE8E8
00000070: push.imm.e 156
00000074: pushenv 0x21EE860
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.v dara
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x21EE860
000000B0: b 0x21EE868
000000B4: popenv 0x41EE824
000000B8: b 0x21EE86C
000000BC: popenv 0x1DEE868
000000C0: push.local.v local.__b__
000000C8: conv.v.b
000000CC: bf 0x21EE8E8
000000D0: push.imm.e 156
000000D4: pushenv 0x21EE8C0
000000D8: push.imm.e 3
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.v oil
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x21EE8C0
00000110: b 0x21EE8C8
00000114: popenv 0x41EE884
00000118: b 0x21EE8CC
0000011C: popenv 0x1DEE8C8
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x21EE8E8
00000130: call action_kill_object(argc=0)
00000138: popz