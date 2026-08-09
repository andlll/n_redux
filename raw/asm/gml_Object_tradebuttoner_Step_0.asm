// gml_Object_tradebuttoner_Step_0  locals=2 args=0 len=492
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
00000034: bf 0x20BE9D4
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
0000006C: bf 0x20BE9D4
00000070: push.imm.e 156
00000074: pushenv 0x20BE94C
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.v dara
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20BE94C
000000B0: b 0x20BE954
000000B4: popenv 0x40BE910
000000B8: b 0x20BE958
000000BC: popenv 0x1CBE954
000000C0: push.local.v local.__b__
000000C8: conv.v.b
000000CC: bf 0x20BE9D4
000000D0: push.imm.e 156
000000D4: pushenv 0x20BE9AC
000000D8: push.imm.e 3
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.v oil
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x20BE9AC
00000110: b 0x20BE9B4
00000114: popenv 0x40BE970
00000118: b 0x20BE9B8
0000011C: popenv 0x1CBE9B4
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x20BE9D4
00000130: call action_kill_object(argc=0)
00000138: popz
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: push.imm.e 1
00000148: conv.i.v
0000014C: push.v active
00000154: call action_if_variable(argc=3)
0000015C: pop.v.v local.__b__
00000164: push.local.v local.__b__
0000016C: conv.v.b
00000170: bf 0x20BEA38
00000174: push.d 0.6
00000180: conv.d.v
00000184: push.i 16777215
0000018C: conv.i.v
00000190: call action_sprite_color(argc=2)
00000198: popz
0000019C: b 0x20BEA58
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: push.i 16777215
000001B0: conv.i.v
000001B4: call action_sprite_color(argc=2)
000001BC: popz
000001C0: push.imm.e 0
000001C4: conv.i.v
000001C8: push.imm.e 0
000001CC: conv.i.v
000001D0: push.global.v global.sca
000001D8: push.global.v global.sca
000001E0: call action_sprite_transform(argc=4)
000001E8: popz