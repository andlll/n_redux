// gml_Object_honda34a_Step_0  locals=2 args=0 len=344
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
00000034: bf 0x20A5E64
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
0000006C: bf 0x20A5E64
00000070: push.imm.e 156
00000074: pushenv 0x20A5DDC
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.v dara
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20A5DDC
000000B0: b 0x20A5DE4
000000B4: popenv 0x40A5DA0
000000B8: b 0x20A5DE8
000000BC: popenv 0x1CA5DE4
000000C0: push.local.v local.__b__
000000C8: conv.v.b
000000CC: bf 0x20A5E64
000000D0: push.imm.e 156
000000D4: pushenv 0x20A5E3C
000000D8: push.imm.e 3
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.v oil
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x20A5E3C
00000110: b 0x20A5E44
00000114: popenv 0x40A5E00
00000118: b 0x20A5E48
0000011C: popenv 0x1CA5E44
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x20A5E64
00000130: call action_kill_object(argc=0)
00000138: popz
0000013C: push.v y
00000144: neg.v.d
00000148: push.imm.e 2
0000014C: sub.i.v
00000150: pop.v.v depth