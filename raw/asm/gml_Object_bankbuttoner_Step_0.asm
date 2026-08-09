// gml_Object_bankbuttoner_Step_0  locals=2 args=0 len=644
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
00000034: bf 0x20BEE58
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
0000006C: bf 0x20BEE58
00000070: push.imm.e 156
00000074: pushenv 0x20BEDD0
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.v dara
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20BEDD0
000000B0: b 0x20BEDD8
000000B4: popenv 0x40BED94
000000B8: b 0x20BEDDC
000000BC: popenv 0x1CBEDD8
000000C0: push.local.v local.__b__
000000C8: conv.v.b
000000CC: bf 0x20BEE58
000000D0: push.imm.e 156
000000D4: pushenv 0x20BEE30
000000D8: push.imm.e 3
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.v oil
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x20BEE30
00000110: b 0x20BEE38
00000114: popenv 0x40BEDF4
00000118: b 0x20BEE3C
0000011C: popenv 0x1CBEE38
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x20BEE58
00000130: call action_kill_object(argc=0)
00000138: popz
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: push.imm.e 0
00000148: conv.i.v
0000014C: push.global.v global.sca
00000154: push.global.v global.sca
0000015C: call action_sprite_transform(argc=4)
00000164: popz
00000168: push.imm.e 0
0000016C: conv.i.v
00000170: push.imm.e 1
00000174: conv.i.v
00000178: push.imm.e 150
0000017C: conv.i.v
00000180: call action_if_number(argc=3)
00000188: pop.v.v local.__b__
00000190: push.local.v local.__b__
00000198: conv.v.b
0000019C: bf 0x20BEEE0
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: push.i 16777215
000001B0: conv.i.v
000001B4: call action_sprite_color(argc=2)
000001BC: popz
000001C0: b 0x20BEFA0
000001C4: push.imm.e 0
000001C8: conv.i.v
000001CC: push.imm.e 0
000001D0: conv.i.v
000001D4: push.v loaned
000001DC: call action_if_variable(argc=3)
000001E4: pop.v.v local.__b__
000001EC: push.local.v local.__b__
000001F4: conv.v.b
000001F8: bf 0x20BEF40
000001FC: push.d 0.6
00000208: conv.d.v
0000020C: push.i 16777215
00000214: conv.i.v
00000218: call action_sprite_color(argc=2)
00000220: popz
00000224: push.imm.e 0
00000228: conv.i.v
0000022C: push.imm.e 1
00000230: conv.i.v
00000234: push.v loaned
0000023C: call action_if_variable(argc=3)
00000244: pop.v.v local.__b__
0000024C: push.local.v local.__b__
00000254: conv.v.b
00000258: bf 0x20BEFA0
0000025C: push.d 0.2
00000268: conv.d.v
0000026C: push.i 16777215
00000274: conv.i.v
00000278: call action_sprite_color(argc=2)
00000280: popz