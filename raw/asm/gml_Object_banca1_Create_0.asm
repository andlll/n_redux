// gml_Object_banca1_Create_0  locals=2 args=0 len=784
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i redder
00000020: push.imm.e 1
00000024: conv.i.v
00000028: call action_set_relative(argc=1)
00000030: popz
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.imm.e 236
00000048: conv.i.v
0000004C: call action_create_object(argc=3)
00000054: popz
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: call action_set_relative(argc=1)
00000068: popz
0000006C: push.imm.e 1
00000070: conv.i.v
00000074: call action_set_relative(argc=1)
0000007C: popz
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 297
00000094: conv.i.v
00000098: call action_create_object(argc=3)
000000A0: popz
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: call action_set_relative(argc=1)
000000B4: popz
000000B8: push.imm.e 1
000000BC: conv.i.v
000000C0: call action_set_relative(argc=1)
000000C8: popz
000000CC: push.imm.e -40
000000D0: conv.i.v
000000D4: push.imm.e -50
000000D8: conv.i.v
000000DC: push.imm.e 132
000000E0: conv.i.v
000000E4: call action_create_object(argc=3)
000000EC: popz
000000F0: push.imm.e 0
000000F4: conv.i.v
000000F8: call action_set_relative(argc=1)
00000100: popz
00000104: push.imm.e 455
00000108: pushenv 0x20DABCC
0000010C: push.imm.e 0
00000110: conv.i.v
00000114: push.imm.e 1
00000118: conv.i.v
0000011C: push.v night
00000124: call action_if_variable(argc=3)
0000012C: pop.v.v local.__b__
00000134: push.local.v local.__b__
0000013C: conv.v.b
00000140: bf 0x20DABCC
00000144: b 0x20DABD4
00000148: popenv 0x40DAB90
0000014C: b 0x20DABD8
00000150: popenv 0x1CDABD4
00000154: push.local.v local.__b__
0000015C: conv.v.b
00000160: bf 0x20DAC08
00000164: push.imm.e 1
00000168: conv.i.v
0000016C: push.i 16366009
00000174: conv.i.v
00000178: call action_sprite_color(argc=2)
00000180: popz
00000184: push.imm.e 455
00000188: pushenv 0x20DAC4C
0000018C: push.imm.e 0
00000190: conv.i.v
00000194: push.imm.e 1
00000198: conv.i.v
0000019C: push.v dawn
000001A4: call action_if_variable(argc=3)
000001AC: pop.v.v local.__b__
000001B4: push.local.v local.__b__
000001BC: conv.v.b
000001C0: bf 0x20DAC4C
000001C4: b 0x20DAC54
000001C8: popenv 0x40DAC10
000001CC: b 0x20DAC58
000001D0: popenv 0x1CDAC54
000001D4: push.local.v local.__b__
000001DC: conv.v.b
000001E0: bf 0x20DAC88
000001E4: push.imm.e 1
000001E8: conv.i.v
000001EC: push.i 15201023
000001F4: conv.i.v
000001F8: call action_sprite_color(argc=2)
00000200: popz
00000204: push.imm.e 2
00000208: conv.i.v
0000020C: push.imm.e 2000
00000210: conv.i.v
00000214: call action_set_alarm(argc=2)
0000021C: popz
00000220: push.imm.e 5
00000224: conv.i.v
00000228: push.imm.e 23
0000022C: conv.i.v
00000230: call action_set_alarm(argc=2)
00000238: popz
0000023C: push.imm.e 4
00000240: conv.i.v
00000244: push.imm.e 600
00000248: conv.i.v
0000024C: call action_set_alarm(argc=2)
00000254: popz
00000258: push.imm.e 6
0000025C: conv.i.v
00000260: push.imm.e 960
00000264: conv.i.v
00000268: call action_set_alarm(argc=2)
00000270: popz
00000274: push.imm.e 3
00000278: conv.i.v
0000027C: push.imm.e 120
00000280: conv.i.v
00000284: call action_set_alarm(argc=2)
0000028C: popz
00000290: push.imm.e 1300
00000294: pop.v.i life
0000029C: push.imm.e 156
000002A0: pushenv 0x20DAD68
000002A4: push.imm.e 1
000002A8: conv.i.v
000002AC: call action_set_relative(argc=1)
000002B4: popz
000002B8: push.v wewe
000002C0: push.imm.e 70
000002C4: add.i.v
000002C8: pop.v.v wewe
000002D0: push.imm.e 0
000002D4: conv.i.v
000002D8: call action_set_relative(argc=1)
000002E0: popz
000002E4: popenv 0x40DAD28
000002E8: push.v y
000002F0: neg.v.d
000002F4: pop.v.v depth
000002FC: push.imm.e 0
00000300: conv.i.v
00000304: call action_set_relative(argc=1)
0000030C: popz