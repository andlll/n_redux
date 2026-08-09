// gml_Object_gru_Create_0  locals=2 args=0 len=412
// locals: arguments, __b__
00000000: push.imm.e 156
00000004: pushenv 0x2169064
00000008: push.imm.e 3
0000000C: conv.i.v
00000010: push.imm.e 0
00000014: conv.i.v
00000018: push.v oil
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2169064
00000040: b 0x216906C
00000044: popenv 0x4169028
00000048: b 0x2169070
0000004C: popenv 0x1D6906C
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x216908C
00000060: call action_kill_object(argc=0)
00000068: popz
0000006C: push.v y
00000074: neg.v.d
00000078: pop.v.v depth
00000080: push.imm.e 455
00000084: pushenv 0x21690E4
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.v night
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x21690E4
000000C0: b 0x21690EC
000000C4: popenv 0x41690A8
000000C8: b 0x21690F0
000000CC: popenv 0x1D690EC
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x2169120
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.i 16366009
000000F0: conv.i.v
000000F4: call action_sprite_color(argc=2)
000000FC: popz
00000100: push.imm.e 455
00000104: pushenv 0x2169164
00000108: push.imm.e 0
0000010C: conv.i.v
00000110: push.imm.e 1
00000114: conv.i.v
00000118: push.v dawn
00000120: call action_if_variable(argc=3)
00000128: pop.v.v local.__b__
00000130: push.local.v local.__b__
00000138: conv.v.b
0000013C: bf 0x2169164
00000140: b 0x216916C
00000144: popenv 0x4169128
00000148: b 0x2169170
0000014C: popenv 0x1D6916C
00000150: push.local.v local.__b__
00000158: conv.v.b
0000015C: bf 0x21691A0
00000160: push.imm.e 1
00000164: conv.i.v
00000168: push.i 15201023
00000170: conv.i.v
00000174: call action_sprite_color(argc=2)
0000017C: popz
00000180: push.imm.e 0
00000184: conv.i.v
00000188: push.imm.e 100
0000018C: conv.i.v
00000190: call action_set_alarm(argc=2)
00000198: popz