// gml_Object_eoli_Create_0  locals=2 args=0 len=592
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i redder
00000020: push.imm.e 156
00000024: pushenv 0x20F54C0
00000028: push.imm.e 1
0000002C: conv.i.v
00000030: call action_set_relative(argc=1)
00000038: popz
0000003C: push.v hap
00000044: push.imm.e -20
00000048: add.i.v
0000004C: pop.v.v hap
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: call action_set_relative(argc=1)
00000064: popz
00000068: popenv 0x40F5480
0000006C: push.v y
00000074: neg.v.d
00000078: pop.v.v depth
00000080: push.d 0.25
0000008C: conv.d.v
00000090: push.imm.e 0
00000094: conv.i.v
00000098: push.imm.e 1011
0000009C: conv.i.v
000000A0: call action_sprite_set(argc=3)
000000A8: popz
000000AC: push.imm.e 455
000000B0: pushenv 0x20F5548
000000B4: push.imm.e 0
000000B8: conv.i.v
000000BC: push.imm.e 1
000000C0: conv.i.v
000000C4: push.v night
000000CC: call action_if_variable(argc=3)
000000D4: pop.v.v local.__b__
000000DC: push.local.v local.__b__
000000E4: conv.v.b
000000E8: bf 0x20F5548
000000EC: b 0x20F5550
000000F0: popenv 0x40F550C
000000F4: b 0x20F5554
000000F8: popenv 0x1CF5550
000000FC: push.local.v local.__b__
00000104: conv.v.b
00000108: bf 0x20F5584
0000010C: push.imm.e 1
00000110: conv.i.v
00000114: push.i 16366009
0000011C: conv.i.v
00000120: call action_sprite_color(argc=2)
00000128: popz
0000012C: push.imm.e 455
00000130: pushenv 0x20F55C8
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.imm.e 1
00000140: conv.i.v
00000144: push.v dawn
0000014C: call action_if_variable(argc=3)
00000154: pop.v.v local.__b__
0000015C: push.local.v local.__b__
00000164: conv.v.b
00000168: bf 0x20F55C8
0000016C: b 0x20F55D0
00000170: popenv 0x40F558C
00000174: b 0x20F55D4
00000178: popenv 0x1CF55D0
0000017C: push.local.v local.__b__
00000184: conv.v.b
00000188: bf 0x20F5604
0000018C: push.imm.e 1
00000190: conv.i.v
00000194: push.i 15201023
0000019C: conv.i.v
000001A0: call action_sprite_color(argc=2)
000001A8: popz
000001AC: push.imm.e 156
000001B0: pushenv 0x20F564C
000001B4: push.imm.e 1
000001B8: conv.i.v
000001BC: call action_set_relative(argc=1)
000001C4: popz
000001C8: push.v wewe
000001D0: push.imm.e 200
000001D4: add.i.v
000001D8: pop.v.v wewe
000001E0: push.imm.e 0
000001E4: conv.i.v
000001E8: call action_set_relative(argc=1)
000001F0: popz
000001F4: popenv 0x40F560C
000001F8: push.imm.e 0
000001FC: conv.i.v
00000200: push.imm.e 30
00000204: conv.i.v
00000208: call action_set_alarm(argc=2)
00000210: popz
00000214: push.imm.e 800
00000218: pop.v.i life
00000220: push.imm.e 5
00000224: conv.i.v
00000228: push.imm.e 23
0000022C: conv.i.v
00000230: call action_set_alarm(argc=2)
00000238: popz
0000023C: push.imm.e 0
00000240: conv.i.v
00000244: call action_set_relative(argc=1)
0000024C: popz