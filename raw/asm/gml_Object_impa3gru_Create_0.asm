// gml_Object_impa3gru_Create_0  locals=2 args=0 len=328
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x2145918
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2145918
00000040: b 0x2145920
00000044: popenv 0x41458DC
00000048: b 0x2145924
0000004C: popenv 0x1D45920
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2145954
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 455
00000084: pushenv 0x2145998
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.v dawn
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x2145998
000000C0: b 0x21459A0
000000C4: popenv 0x414595C
000000C8: b 0x21459A4
000000CC: popenv 0x1D459A0
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x21459D4
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.i 15201023
000000F0: conv.i.v
000000F4: call action_sprite_color(argc=2)
000000FC: popz
00000100: push.v y
00000108: neg.v.d
0000010C: push.imm.e 258
00000110: sub.i.v
00000114: pop.v.v depth
0000011C: push.imm.e 1
00000120: pop.v.i phase
00000128: push.imm.e 0
0000012C: pop.v.i demos
00000134: push.imm.e 260
00000138: push.imm.e -1
0000013C: push.imm.e 0
00000140: pop.v.i obj0.alarm[array]